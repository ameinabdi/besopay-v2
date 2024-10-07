import styled from 'styled-components';

const UserCard = styled.div`
	margin: 0px;
	margin-top: 16px;
	border-radius: 0px;
	background: #fff;
	overflow-y: hidden;

 .avatarHolder {
	 margin-bottom: 24px;
	 text-align: center;
}
.avatarHolderImage {
	 width: 104px;
	 height: 104px;
	 margin-bottom: 20px;
}
 .avatarHolder .name {
	 margin-bottom: 4px;
	 font-weight: 500;
	 font-size: 20px;
	 line-height: 28px;
}
 .detail p {
	 position: relative;
	 margin-bottom: 8px;
	 padding-left: 26px;
}
 .detail p:last-child {
	 margin-bottom: 0;
}
 .detail i {
	 position: absolute;
	 top: 4px;
	 left: 0;
	 width: 14px;
	 height: 14px;
}
 .tagsTitle, .teamTitle {
	 margin-bottom: 12px;
	 font-weight: 500;
}
 .tags :global .ant-tag {
	 margin-bottom: 8px;
}
 .team :global .ant-avatar {
	 margin-right: 12px;
}
 .team a {
	 display: block;
	 margin-bottom: 24px;
	 overflow: hidden;
	 white-space: nowrap;
	 text-overflow: ellipsis;
	 word-break: break-all;
	 transition: color 0.3s;
}
 .team a:hover {
	 color: red;
}
 .tabsCard :global .ant-card-head {
	 padding: 0 16px;
}
`;

export default UserCard;