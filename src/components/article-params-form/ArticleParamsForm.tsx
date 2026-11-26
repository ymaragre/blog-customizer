import { clsx } from 'clsx';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsProps = {
  applyOptions: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draftOptions, setDraftOptions] =
    useState<ArticleStateType>(defaultArticleState);
  const paramsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFormOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (!paramsContainerRef.current?.contains(event.target as Node))
        setIsFormOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  const handleArrowClick = (): void => setIsFormOpen((value) => !value);

  const handleChange = <K extends keyof ArticleStateType>(optionsKey: K) => {
    return (selected: ArticleStateType[K]): void => {
      setDraftOptions({
        ...draftOptions,
        [optionsKey]: selected,
      });
    };
  };

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    props.applyOptions({ ...draftOptions });
    setIsFormOpen(false);
  };

  const handleReset = (e: SyntheticEvent): void => {
    e.preventDefault();
    props.applyOptions({ ...defaultArticleState });
    setDraftOptions({ ...defaultArticleState });
    setIsFormOpen(false);
  };

  return (
    <div ref={paramsContainerRef}>
      <ArrowButton isOpen={isFormOpen} onClick={handleArrowClick} />
      <aside className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draftOptions.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
          />
          <RadioGroup
            name="fontSizeOptions"
            options={fontSizeOptions}
            selected={draftOptions.fontSizeOption}
            title="Размер шрифта"
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draftOptions.fontColor}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draftOptions.backgroundColor}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draftOptions.contentWidth}
            onChange={handleChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
