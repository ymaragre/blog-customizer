import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';
import {
  defaultArticleState,
  type ArticleStateType,
} from 'src/constants/articleProps.ts';

import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);

  const handleApplyOptions = (value: ArticleStateType): void => setArticleState(value);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm applyOptions={handleApplyOptions} />
      <Article />
    </main>
  );
};
