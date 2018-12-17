// @flow
/* eslint-disable */

import { css, createGlobalStyle } from 'styled-components'
import normalized from './normalized'
import fonts from './fonts'

export const GlobalStyles = createGlobalStyle`
	${normalized}
	${fonts}

	@import url('https://fonts.googleapis.com/css?family=Amiri');

	html {
		font-size: 10px;
		font-family: ${(props) => props.theme.type.fontFamily.sans};
		font-weight: 300;
	}

	form {
		margin: 0;
	}

	body {
		padding: 0;
	}

	button, input, select, option, textarea {
		background: white;
		font-family: ${(props) => props.theme.type.fontFamily.sans};
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
		color: #454545;
	}

	label{
		color: #454545;
	}

	button {
		cursor: pointer;
	}

	h1, h2, h3, h4, h5, h6, p, li, ol {
		font-weight: ${(props) => props.theme.type.weight.heavy};
		margin: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	* {
		box-sizing: border-box;
	}


	#root,
	#reactRoot {
		height: 100%;
	}

	figure {
		margin 0;
	}

	img {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}


`
