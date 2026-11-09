import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [options, setOptions] = useState<ArticleStateType>(defaultArticleState);

  const handleApplyOptions = (value: ArticleStateType): void => setOptions(value);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': options.fontFamilyOption.value,
          '--font-size': options.fontSizeOption.value,
          '--font-color': options.fontColor.value,
          '--container-width': options.contentWidth.value,
          '--bg-color': options.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm currentOptions={options} applyOptions={handleApplyOptions} />
      <Article />
    </main>
  );
};
