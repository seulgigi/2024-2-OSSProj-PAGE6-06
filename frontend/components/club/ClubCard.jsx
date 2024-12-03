import { faClock, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import * as S from "./Styled";
import { useRouter } from "next/router";
import { API } from "@/pages/api";

export default function ClubCard({ club, handleErrorModal }) {
  const router = useRouter();

  const content = club.content;
  const shortContent =
    content.length > 30 ? content.slice(0, 30) + "..." : content;

  const fetchClubJoin = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        `/join/clublist/${club.id}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      router.push(`/routine`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        handleErrorModal(error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };

  const handleJoin = () => {
    fetchClubJoin();
  };

  return (
    <S.ClubCardContainer>
      {club.image ? (
        <S.ClubCardImage
          src={club.image}
          width={160}
          height={100}
          alt="club_image"
        />
      ) : (
        <>Loading...</>
      )}

      <S.ClubCardInfo>
        <S.ClubCardInfoText>
          <S.ClubCardInfoIcon icon={faUserGroup} />
          {club.participantCount}명 참여중
        </S.ClubCardInfoText>
        <S.ClubCardInfoText>
          <S.ClubCardInfoIcon icon={faClock} />
          {club.time}분
        </S.ClubCardInfoText>
      </S.ClubCardInfo>
      <S.ClubCardTitle>{club.title}</S.ClubCardTitle>
      <S.ClubCardDescription>{shortContent}</S.ClubCardDescription>
      <S.ClubCardButtonSection>
        <S.ClubCardButtonShow onClick={() => router.push(`/club/${club.id}`)}>
          구경하기
        </S.ClubCardButtonShow>
        <S.ClubCardButtonJoin onClick={handleJoin}>
          참여하기
        </S.ClubCardButtonJoin>
      </S.ClubCardButtonSection>
    </S.ClubCardContainer>
  );
}
