import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import SearchBox from "../components/SearchBox";
import { useRecoilState } from "recoil";
import { serachIdAtom } from "../atoms";
import { useEffect, useState } from "react";
import ScoreBox from "../components/ScoreBox";
import { CopyBtn } from "./ClanWar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSave } from "@fortawesome/free-solid-svg-icons";

const GridBox = styled(motion.div)`
  display: flex;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
  justify-content: space-between;
`;

export const MemberList = styled.div``;

export const Member = styled.div`
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
const SetInKakaoRoom = styled(CopyBtn)`
  width: 150px;
`;

const ExplainSetKakaoRommBox = styled(GridBox)`
  font-size: 14px;
`;

const SetKakoRoomMemberContainer = styled(GridBox)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
const AllClanMembers = styled(motion.div)`
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  padding: 10px 20px;
`;
const InKakaoRoomMember = styled(AllClanMembers)``;

const AllClanMember = styled.div`
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
  &:hover {
    border: 1px solid ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

const SaveBtn = styled(CopyBtn)``;
const SettingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
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

const searchMemberList = (search, clanMembers) => {
  if (search === "") {
    return clanMembers;
  } else {
    return clanMembers.filter((member) => {
      return member.name.toUpperCase().includes(search.toUpperCase());
    });
  }
};

function ClanMember({ clanMembers }) {
  const [search, setSearchId] = useRecoilState(serachIdAtom);
  const [inKakaoRoom, setInKakaoRoom] = useState(false);
  const [inKakaoRoomMember, setInKakaoRoomMember] = useState([]);

  useEffect(() => {
    searchMemberList(search, clanMembers);
  }, [search, clanMembers]);

  useEffect(() => {
    setSearchId("");
  }, [setSearchId]);

  const setInKakaoRoomClick = () => {
    setInKakaoRoom((prev) => !prev);
  };

  const addKakoRoomMember = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (inKakaoRoomMember.includes(e.target.innerText)) {
      setInKakaoRoomMember((prev) =>
        prev.filter((member) => member !== e.target.innerText)
      );
    } else {
      setInKakaoRoomMember((prev) => [...prev, e.target.innerText]);
    }
  };

  const searchCompleteMember = searchMemberList(search, clanMembers);

  return (
    <>
      <SettingContainer>
        <SetInKakaoRoom
          onClick={setInKakaoRoomClick}
          variants={boxVariants}
          initial="start"
          animate="end"
        >
          공지방 가입인원 설정 <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
        </SetInKakaoRoom>
        {inKakaoRoom ? (
          <SaveBtn>
            저장하기 <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
          </SaveBtn>
        ) : null}
      </SettingContainer>
      {inKakaoRoom ? (
        <>
          <ExplainSetKakaoRommBox>
            공지방 가입한 사람 설정하는 곳
          </ExplainSetKakaoRommBox>
          <SetKakoRoomMemberContainer>
            <AllClanMembers>
              <div>ℹ️ 전체 인원</div>
              <br />
              {clanMembers.map((member, index) => {
                return (
                  <AllClanMember
                    key={index}
                    onClick={addKakoRoomMember}
                    style={{
                      backgroundColor: inKakaoRoomMember.includes(member.name)
                        ? "#4cd137"
                        : "",
                    }}
                  >
                    {member.name}
                  </AllClanMember>
                );
              })}
            </AllClanMembers>
            <InKakaoRoomMember>
              <div>ℹ️ 공지방 인원 </div>
              <br />
              {inKakaoRoomMember.map((member, index) => {
                return <AllClanMember key={index}>{member}</AllClanMember>;
              })}
            </InKakaoRoomMember>
          </SetKakoRoomMemberContainer>
        </>
      ) : (
        <MemberList variants={boxVariants} initial="start" animate="end">
          <SearchBox
            MemberCount={
              search === "" ? clanMembers.length : searchCompleteMember.length
            }
          />
          <ScoreBox clanMembers={clanMembers} />
          {searchCompleteMember.map((member, index) => {
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
      )}
    </>
  );
}

export default ClanMember;
