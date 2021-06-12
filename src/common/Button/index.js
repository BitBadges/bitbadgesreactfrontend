import * as S from "./styles";

const Button = ({ color, width, children, onClick, id }) => {
  return (
    <S.Button
      color={color}
      width={width}
      onClick={onClick}
      id={id}
    >
      {children}
    </S.Button>
  );
};

export default Button;
