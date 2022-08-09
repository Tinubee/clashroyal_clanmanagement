import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { boxVariants, Info, Member, MemberList } from "./ClanMember";
import { CopyBtn, CopyContainer, CopyText, GridBox, Text } from "./ClanWar";
import { Container } from "./Home";

function ClanDonation(clanData) {
  const formRef = useRef();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    //get text in formRef
    const text = formRef.current.innerText;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };
  return (
    <Container>
      <CopyContainer>
        <CopyBtn
          onClick={handleCopy}
          variants={boxVariants}
          initial="start"
          animate="end"
        >
          복사하기 <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
        </CopyBtn>
        <CopyText>{isCopied ? "복사완료 !" : ""}</CopyText>
      </CopyContainer>
      <GridBox
        ref={formRef}
        variants={boxVariants}
        initial="start"
        animate="end"
      >
        <Text>{`◈${clanData.clanWar.data.clan.name}◈`}</Text>
        <Text>지원률 100 이하 목록</Text>
        <br />
        <MemberList>
          {clanData.clanMembers.map((member, index) => {
            return (
              <Member key={index}>
                <Info>
                  {member.donations < 100
                    ? `${member.name} - ${member.donations}`
                    : null}
                </Info>
              </Member>
            );
          })}
        </MemberList>
      </GridBox>
    </Container>
  );
}

export default ClanDonation;
