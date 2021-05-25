import { withTranslation } from "react-i18next";

import * as S from "./styles";

const TextArea = ({ name, id, placeholder, onChange, t, additionalInfo }) => (
  <S.Container>
    <label htmlFor={name}>{t(id)}</label>
    <S.TextArea
      spellcheck="false"
      placeholder={t(placeholder)}
      id={name}
      name={name}
      onChange={onChange}
    />
    <label htmlFor={name}>{t(additionalInfo)}</label>
  </S.Container>
);

export default withTranslation()(TextArea);
