// @flow
import React from 'react'
import styled from 'styled-components'
import type { ContentBlocks, Hero as HeroType } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { Column } from 'Components/Layout'
import { FadeIn } from 'Components/Effects'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'
import { HomepageWrapper } from './styled'

const Grid = styled.div`
	${({ theme }) => `
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: ${theme.layout.spacing.double};
		grid-column-gap: ${theme.layout.spacing.double};
	`}
`

const BlockWrapper = styled.div`
	${({ theme, fullWidth, type }) => `
		grid-column: span ${fullWidth ? '2' : '1'};
		text-align: center;
		border: ${type === 'richText' ? '2px solid' : 'none'};
		padding: ${type === 'richText' ? theme.layout.spacing.double : '0'};
	`}
`

/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		hero?: HeroType,
	},
	// siteSettings: SiteSettings,
}

const Kame = ({ homepage }: Props) => {
	return (
		<HomepageWrapper>
			<Hero hero={homepage.hero} view="carousel" />
			<Column width="wide">
				<FadeIn delay={500}>
					<Grid>
						{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
						{homepage.content &&
							homepage.content.map((block, index) => (
								<BlockWrapper key={block._key} type={block._type} fullWidth={block.fullWidth}>
									<Block block={block} number={index} />
								</BlockWrapper>
							))}
					</Grid>
				</FadeIn>
			</Column>
		</HomepageWrapper>
	)
}

export default () => (
	<SettingsConsumer>
		{(siteSettings) => (
			<HomepageQuery>{({ data }) => (data ? <Kame siteSettings={siteSettings} {...data} /> : null)}</HomepageQuery>
		)}
	</SettingsConsumer>
)
