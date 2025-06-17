// src/components/article-params-form/ArticleParamsForm.stories.tsx

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/namespace
import { ArticleParamsForm } from './ArticleParamsForm';

import { defaultArticleState } from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsForm,
};

export default meta;

export const Default = () => (
	<ArticleParamsForm
		initialState={defaultArticleState}
		onApply={(newState) => {
			console.log('Applied', newState);
		}}
		onReset={() => {
			console.log('Reset');
		}}
	/>
);
