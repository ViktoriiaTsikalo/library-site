import { useState } from 'react';
import css from './Rules.module.css';
import IconDown from '../../assets/svg/down.svg?react';

export const Rules = () => {
  const [openSection, setOpenSection] = useState(null);
  const [showSubSections, setShowSubSections] = useState(false);
  const [openSubSection, setOpenSubSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
    setShowSubSections(false);
    setOpenSubSection(null);
  };

  const toggleRightsAndDuties = () => {
    setShowSubSections(!showSubSections);
    setOpenSection(null);
    setOpenSubSection(null);
  };

  const toggleSubSection = (sub) => {
    setOpenSubSection(openSubSection === sub ? null : sub);
  };

  return (
    <section className={css.fifthSection} id="rules-link">
      <div className={css.container}>
        <h2 className={css.fifthSectionTitle}>ПРАВИЛА</h2>
        <p className={css.fifthSectionTitleText}>
          користування шкільною бібліотекою ЗЗСО «Олениненська гімназія»
        </p>

 
        <div className={css.sectionHeader} onClick={() => toggleSection('general')}>
          <h3>I. Загальні положення</h3>
          <IconDown className={`${css.iconListDown} ${openSection === 'general' ? css.open : ''}`} width="40" height="40" />
        </div>
        {openSection === 'general' && (
          <div className={`${css.sectionContent} ${css.show}`}>
            <ul>
              <li>Правила користування бібліотекою розроблені відповідно до Закону України «Про бібліотеки і бібліотечну справу», «Положенням про бібліотеку загальноосвітнього навчального закладу».</li>
              <li>Бібліотека є культурно-просвітницькою та науково-інформаційною установою.</li>
              <li>Основними напрямами діяльності бібліотеки є формування, зберігання документально-інформаційних ресурсів та бібліотечне обслуговування.</li>
              <li>Право користування бібліотекою мають здобувачі освіти, працівники школи, батьки.</li>
            </ul>
          </div>
        )}

        <div className={css.sectionHeader} onClick={toggleRightsAndDuties}>
          <h3>II. Права і обов’язки читачів</h3>
          <IconDown className={`${css.iconListDown} ${showSubSections ? css.open : ''}`} width="40" height="40" />
        </div>

        {showSubSections && (
          <div className={css.subSectionWrapper}>
         
            <div className={css.subSectionHeader} onClick={() => toggleSubSection('rights')}>
              <h4>Права читачів</h4>
              <IconDown className={`${css.iconListDown} ${openSubSection === 'rights' ? css.open : ''}`} width="40" height="40" />
            </div>
            {openSubSection === 'rights' && (
              <div className={`${css.sectionContent} ${css.show}`}>
                <ul>
                  <li>Користуватися бібліотекою незалежно від місця проживання.</li>
                  <li>Безкоштовно отримувати основні види бібліотечно-інформаційних послуг.</li>
                  <li>Можуть отримати додому до 5 книг терміном на 30 днів, книги підвищеного попиту — на 15 днів.</li>
                  <li>Книги-довідники, які є в одному примірнику, використовуються тільки в читальній залі.</li>
                  <li>Журнали видаються додому терміном на 5 днів.</li>
                  <li>Можуть продовжити термін користування книгами, якщо на них немає попиту, але не більше 2-х разів.</li>
                </ul>
              </div>
            )}

            <div className={css.subSectionHeader} onClick={() => toggleSubSection('duties')}>
              <h4>Обов’язки читачів</h4>
              <IconDown className={`${css.iconListDown} ${openSubSection === 'duties' ? css.open : ''}`} width="40" height="40" />
            </div>
            {openSubSection === 'duties' && (
              <div className={`${css.sectionContent} ${css.show}`}>
                <ul>
                  <li>При запису до бібліотеки ознайомитися з правилами і підписати формуляр.</li>
                  <li>Учні з 5 класу підписуються у формулярах за кожну книгу.</li>
                  <li>Бережно ставитись до книг: не робити поміток, не виривати сторінки.</li>
                  <li>Повертати книги у визначений термін.</li>
                  <li>Не порушувати порядок на полицях, не виймати картки з каталогів.</li>
                  <li>Повідомляти про дефекти книг бібліотекарю.</li>
                  <li>За зіпсовані або загублені книги читачі несуть матеріальну відповідальність.</li>
                  <li>У разі втрати — повернути рівноцінні за змістом видання.</li>
                  <li>Дотримуватись тиші та режиму в бібліотеці.</li>
                  <li>Залишати сумки та портфелі поза межами бібліотеки.</li>
                  <li>Повідомляти про зміну адреси бібліотекарю.</li>
                  <li>За порушення правил читачі можуть бути тимчасово позбавлені доступу до фонду.</li>
                  <li>Бібліотечний фонд потребує регулярної інвентаризації та обліку.</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};


