import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from './auditLogRepository';
import Roles from '../../security/roles';
import crypto from 'crypto';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';

export default class TenantUserRepository {
  
  static async findByTenantAndUser(
    tenantId,
    userId,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return await options.database.tenantUser.findOne({
      where: {
        tenantId,
        userId,
      },
      include:['inRoles'],
      transaction,
    });
  }

  static async findByInvitationToken(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return await options.database.tenantUser.findOne({
      where: {
        invitationToken,
      },
      include: ['tenant', 'user', 'inRoles'],
      transaction,
    });
  }

  static async create(
    tenant,
    user,
    inRoles,
    options: IRepositoryOptions,
  ) {
    inRoles = inRoles || [];
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const status = selectStatus('active', inRoles);

   const tenantUser =  await options.database.tenantUser.create(
      {
        tenantId: tenant.id,
        userId: user.id,
        status,
      },
      { transaction },
    );
    await tenantUser.setInRoles(inRoles || [], {
      transaction,
    });
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          email: user.email,
          status,
          inRoles,
        },
      },
      options,
    );
  }

  static async destroy(
    tenantId,
    id,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let user = await options.database.user.findByPk(id, {
      transaction,
    });

    let tenantUser = await this.findByTenantAndUser(
      tenantId,
      id,
      options,
    );

    await tenantUser.destroy({ transaction });

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.DELETE,
        values: {
          email: user.email,
        },
      },
      options,
    );
  }


  static async createNewRoles(permission, id,tenantId, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let user = await options.database.user.findByPk(id, {
      transaction,
    });

    let tenantUser = await this.findByTenantAndUser(
      tenantId,
      id,
      options,
    );

    let isCreation = false;

    if (!tenantUser) {
      isCreation = true;
      tenantUser = await options.database.tenantUser.create(
        {
          tenantId,
          userId: id,
          status: selectStatus('Active', []),
          invitationToken: crypto
            .randomBytes(20)
            .toString('hex'),
          roles: [],
        },
        { transaction },
      );
    }

    const inRoles = await options.database.roles.create(
      {
        ...lodash.pick(permission, [
          'roles',
          'description',
          'assignToNewUser', 
          'permissions',
          'importHash',
        ]),
        tenantId: tenantId,
        createdById: id,
        updatedById: id,
      },
      {
        transaction,
      },
    );
  

    await tenantUser.setInRoles(inRoles || [], {
      transaction,
    });
    await tenantUser.save({
      transaction,
    });

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: isCreation
          ? AuditLogRepository.CREATE
          : AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: tenantUser.status,
          roles: inRoles,
        },
      },
      options,
    );

    return tenantUser;
  }



  static async updateRoles(tenantId, id, inRoles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let user = await options.database.user.findByPk(id, {
      transaction,
    });

    let tenantUser = await this.findByTenantAndUser(
      tenantId,
      id,
      options,
    );

    let isCreation = false;

    if (!tenantUser) {
      isCreation = true;
      tenantUser = await options.database.tenantUser.create(
        {
          tenantId,
          userId: id,
          status: selectStatus('Active', []),
          invitationToken: crypto
            .randomBytes(20)
            .toString('hex'),
          roles: [],
        },
        { transaction },
      );
    }

    await tenantUser.setInRoles(inRoles || [], {
      transaction,
    });
    await tenantUser.save({
      transaction,
    });

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: isCreation
          ? AuditLogRepository.CREATE
          : AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: tenantUser.status,
          roles: inRoles,
        },
      },
      options,
    );

    return tenantUser;
  }

  static async acceptInvitation(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    let invitationTenantUser = await this.findByInvitationToken(
      invitationToken,
      options,
    );

    const isSameEmailFromInvitation =
      invitationTenantUser.userId === currentUser.id;

    let existingTenantUser = await this.findByTenantAndUser(
      invitationTenantUser.tenantId,
      currentUser.id,
      options,
    );

    // There might be a case that the invite was sent to another email,
    // and the current user is also invited or is already a member
    if (
      existingTenantUser &&
      existingTenantUser.id !== invitationTenantUser.id
    ) {
      // destroys the new invite
      await this.destroy(
        invitationTenantUser.tenantId,
        invitationTenantUser.userId,
        options,
      );

      // Merges the roles from the invitation and the current tenant user
      existingTenantUser.inRoles = [
        ...new Set([
          ...existingTenantUser.inRoles,
          ...invitationTenantUser.inRoles,
        ]),
      ];

      // Change the status to active (in case the existing one is also invited)
      existingTenantUser.invitationToken = null;
      existingTenantUser.status = selectStatus(
        'active',
        existingTenantUser.inRoles,
      );
      await existingTenantUser.setInRoles(existingTenantUser.inRoles || [], {
        transaction,
      });
      await existingTenantUser.save({
        transaction,
      });
    } else {
      // In this case there's no tenant user for the current user and the tenant

      // Sometimes the invitation is sent not to the
      // correct email. In those cases the userId must be changed
      // to match the correct user.
      invitationTenantUser.userId = currentUser.id;
      invitationTenantUser.invitationToken = null;
      invitationTenantUser.status = selectStatus(
        'active',
        invitationTenantUser.inRoles,
      );
      await existingTenantUser.setInRoles(existingTenantUser.inRoles || [], {
        transaction,
      });
      await invitationTenantUser.save({
        transaction,
      });
    }

    const emailVerified =
      currentUser.emailVerified ||
      isSameEmailFromInvitation;

    await options.database.user.update(
      {
        emailVerified,
      },
      { where: { id: currentUser.id }, transaction },
    );

    const auditLogRoles = existingTenantUser
      ? existingTenantUser.roles
      : invitationTenantUser.roles;

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: currentUser.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: currentUser.email,
          roles: auditLogRoles,
          status: selectStatus('active', auditLogRoles),
        },
      },
      options,
    );
  }
}

function selectStatus(oldStatus, newRoles) {
  newRoles = newRoles || [];

  if (oldStatus === 'invited') {
    return oldStatus;
  }
  if (!newRoles.length) {
    return 'empty-permissions';
  }

  return 'active';
}
