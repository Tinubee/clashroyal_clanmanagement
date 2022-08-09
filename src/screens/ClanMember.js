import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const GridBox = styled(motion.div)`
  display: flex;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const MemberList = styled(motion.ul)``;

export const Member = styled.li`
  a {
    margin-left: 10px;
    transition: all 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Info = styled.h2``;
const Detail = styled.div``;

export const boxVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 4,
    },
  },
};

function ClanMember({ clanMembers }) {
  return (
    <MemberList variants={boxVariants} initial="start" animate="end">
      <input placeholder="아이디 검색..." />
      {clanMembers.map((member, index) => {
        const reMemberTag = member.tag.replace("#", "");
        return (
          <GridBox key={index}>
            <Member>
              <Info>
                {member.name} : {member.arena.name} [{member.trophies}🏆]
              </Info>
              <Link
                to={{
                  pathname: `/member/${reMemberTag}/information`,
                  state: reMemberTag,
                }}
              >
                <Detail>{member.name} 님의 상세정보 &rarr;</Detail>
              </Link>
            </Member>
          </GridBox>
        );
      })}
    </MemberList>
  );
}

export default ClanMember;
