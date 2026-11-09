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
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsProps = {
  currentOptions: ArticleStateType;
  applyOptions: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ArticleStateType>(props.currentOptions);
  const paramsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentOptions();
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (!paramsContainerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const setCurrentOptions = (): void => {
    setOptions({
      ...props.currentOptions,
    });
  };

  const handleArrowClick = (): void => setIsOpen((value) => !value);

  const handleChange = (optionsKey: keyof ArticleStateType) => {
    return (selected: OptionType): void => {
      setOptions({
        ...options,
        [optionsKey]: selected,
      });
    };
  };

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    props.applyOptions({
      ...options,
    });
    setIsOpen(false);
  };

  const handleReset = (e: SyntheticEvent): void => {
    e.preventDefault();
    props.applyOptions({ ...defaultArticleState });
    setIsOpen(false);
  };

  return (
    <div ref={paramsContainerRef}>
      <ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={options.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
          />
          <RadioGroup
            name="fontSizeOptions"
            options={fontSizeOptions}
            selected={options.fontSizeOption}
            title="Размер шрифта"
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={options.fontColor}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={options.backgroundColor}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={options.contentWidth}
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
