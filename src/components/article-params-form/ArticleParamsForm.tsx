import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

type Props = {
	initialState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: Props) => {
	const [fontFamilyOption, setFontFamilyOption] = useState(
		initialState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		initialState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(initialState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		initialState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(initialState.contentWidth);

	const [isOpen, setIsOpen] = useState(false);

	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		setFontFamilyOption(initialState.fontFamilyOption);
		setFontSizeOption(initialState.fontSizeOption);
		setFontColor(initialState.fontColor);
		setBackgroundColor(initialState.backgroundColor);
		setContentWidth(initialState.contentWidth);
	}, [initialState]);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpen,
	});

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const containerClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		onApply({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		setIsOpen(false);
	};

	const handleReset = () => {
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside className={containerClassName} ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamilyOption}
						title='шрифт'></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						title='размер шрифта'></RadioGroup>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='цвет шрифта'></Select>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='цвет фона'></Select>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
