// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Match } from 'react-router-dom'
import type { ProductType } from 'Types/ProductTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import Query from 'GraphQL/Query'
import { Column } from 'Components/Layout'
import { Image } from 'Components/Media'
import { CheckoutConsumer } from 'Views/CheckoutProvider'
import { Header2 } from 'Components/Type'
import Helmet from 'Components/Helmet'
import Hero from 'Components/Hero'
import ProductDescription from './ProductDescription'
import productQuery from './productQuery'
import RelatedItem from './RelatedItem'

const Wrapper = styled.div`
	${({ loading }) => `
		opacity: ${loading ? '0.1' : '1'};
		transition: 0.3s;
	`}
`

const Layout = styled.div`
	${({ theme, withHero }) => css`
		display: grid;
		grid-template-columns: 50% 50%;
		grid-column-gap: ${theme.layout.spacing.triple};
		padding-top: ${withHero ? 0 : '250px'};

		${theme.media.queries.tablet`
			grid-template-columns: 100%;
			grid-row-gap: ${theme.layout.spacing.triple};

		`}
	`};
`

const Images = styled.div`
	${({ theme }) => `
		display: grid;
		grid-row-gap: ${theme.layout.spacing.single};
	`}
`

const Description = styled.div`
	${({ theme }) => `
		position: sticky;
		top: ${theme.layout.spacing.double};
		align-self: flex-start;
	`}
`

const RelatedWrapper = styled.div`
	${({ theme }) => `
		margin: calc(${theme.layout.spacing.triple} * 2) 0;
	`}
`

const RelatedItems = styled.div`
	${({ theme }) => `
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		border-top: 8px dotted;
		padding: ${theme.layout.spacing.triple} 0;
	`}
`

const RelatedTitle = styled(Header2)`
	${({ theme }) => `
		flex-basis: 100%;
		text-align: center;
		margin-bottom: ${theme.layout.spacing.double};
	`}
`

/**
 * Product
 */

type BaseProps = {
	match: Match,
}

type Props = {
	product: ProductType,
	cart: CheckoutConsumerProps,
	loading: boolean,
}

const Product = ({ product, cart, loading }: Props) => {
	if (!product) return null
	const seo = {
		name: product.title,
		image: product.images ? product.images[0] : null,
	}
	return (
		<Wrapper loading={loading}>
			<Helmet seo={seo} />
			<Hero hero={product.hero} view="standard" />
			<Column width="wide">
				<Layout withHero={Boolean(product.hero && product.hero.images)}>
					<Images>
						{product.images &&
							product.images.map((image) => (
								<Image key={image.originalSrc} image={image} sizes="(max-width: 600px) 80vw, 45vw" />
							))}
					</Images>
					<Description>
						<ProductDescription cart={cart} product={product} />
					</Description>
				</Layout>
				{product.related && product.related.length ? (
					<RelatedWrapper>
						<RelatedTitle>KEEP L@@KING</RelatedTitle>
						<RelatedItems>
							{product.related.map((item, index) => (
								<RelatedItem number={index} key={item._key} item={item} />
							))}
						</RelatedItems>
					</RelatedWrapper>
				) : null}
			</Column>
		</Wrapper>
	)
}

export default ({ match }: BaseProps) => {
	return (
		<CheckoutConsumer>
			{(cart) => (
				<Query query={productQuery} variables={{ handle: match.params.handle }}>
					{({ data, loading }) =>
						data && data.shop && cart && <Product product={data.shop.productByHandle} loading={loading} cart={cart} />
					}
				</Query>
			)}
		</CheckoutConsumer>
	)
}

// export default (props: BaseProps) => {
// 	return <Composed {...props}>{({ product, cart }) => <Product product={product} cart={cart} />}</Composed>
// }
