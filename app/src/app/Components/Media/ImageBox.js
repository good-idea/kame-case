// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ImageType } from 'Types/ContentTypes'
import Image from './Image'

const Figure = styled.div`
	width: 100%;
	position: relative;
	overflow: hidden;
	something: 'nothing';
`

const PaddingRatio = styled.div`
	${({ pBottom }) => `
		width: 100%;
		padding-bottom: ${pBottom};
		overflow: hidden;
	`};
`

export const ImageWrapper = styled.div`
	& > img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
	}
`

/**
 * ImageBox
 */

type Props = {
	ratio?: number,
	image?: ImageType,
	children?: React.Node,
	sizes: string,
}

const ImageBox = ({ image, ratio, children, sizes }: Props) => {
	const pBottom = `${100 * (ratio || 1)}%`
	return (
		<Figure>
			<PaddingRatio pBottom={pBottom} />
			<ImageWrapper>
				{image && <Image sizes={sizes} image={image} />}
				{children || null}
			</ImageWrapper>
		</Figure>
	)
}

ImageBox.defaultProps = {
	ratio: 1,
	children: null,
	image: undefined,
}

export default ImageBox