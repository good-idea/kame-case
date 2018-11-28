// @flow

type RGB = {
	r: number,
	g: number,
	b: number,
	a: number,
}

type HSV = {
	h: number,
	s: number,
	v: number,
	a: number,
}

type SanityColor = {
	rgb: RGB,
	hsv: HSV,
}

// format === 'rgb' ?
// : format === 'hsv' ? '': ''

export const sanityColorToRGBA = (sanityColor: SanityColor): string => {
	if (!sanityColor) return ''
	const color = sanityColor.rgb
	if (!color) return ''
	const { r, g, b, a } = color
	return `rgba(${r}, ${g}, ${b}, ${a})`
}

// export const sanityColorToRGBA = ({ rgb: { r, g, b, a } }: SanityColor): string =>
