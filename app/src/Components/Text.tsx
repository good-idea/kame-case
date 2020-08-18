import * as React from 'react'
import styled, {
  css,
  DefaultTheme,
  Box,
  BoxProps,
} from '@xstyled/styled-components'

interface CustomTextProps extends BoxProps {
  theme: DefaultTheme
  htmlFor?: string
}

const createTextBase = (as: any) => styled(as)`
  ${() => css`
    margin: 2 0 0.5em;

    strong {
      font-weight: 6;
    }

    em {
      font-style: italic;
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  `}
`

const TextBase = createTextBase(Box)

interface HeadingProps extends Omit<CustomTextProps, 'theme'> {
  children: React.ReactNode
  level: number
  // TODO: type these properly
  style?: any
  as?: any
  htmlFor?: string
}

const hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Heading = ({
  children,
  level,
  as,
  htmlFor,
  ...rest
}: HeadingProps) => {
  if (level < 0 || level > 6) throw new Error('Heading level must be 0-5')
  const tag = as ? as : hTags[level - 1] || hTags[0]
  return (
    <TextBase as={tag} level={level} htmlFor={htmlFor} {...rest}>
      {children}
    </TextBase>
  )
}

type PProps = Omit<HeadingProps, 'level'>

export const P = ({ children, color, htmlFor }: PProps) => {
  return (
    <TextBase as="p" level={5} color={color} htmlFor={htmlFor}>
      {children}
    </TextBase>
  )
}

P.defaultProps = {
  family: 'sans',
  weight: 3,
}

interface LabelProps {
  htmlFor: string
  children: string
}

export const LabelBase = createTextBase('label')

export const Label = styled(LabelBase)`
  ${({ color }) => css`
    font-size: 5;
    color: ${color || 'body.6'};
    margin: 0;
  `}
`

const SpanBase = styled.spanBox``

export const Span = styled(createTextBase(SpanBase))`
  font-size: inherit;

  &[role='button'] {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const TextAnchor = styled.a``

export const BlockQuote = styled.blockquote``

const listStyles = css`
  margin: 3 0;
  line-height: 1.1em;
  padding-left: 2em;
`

export const Ol = styled.ol`
  ${listStyles};
`

export const Ul = styled.ul`
  ${listStyles};
`
const LiBase = createTextBase('li')

export const Li = styled(LiBase)`
  font-size: 5;
  margin: 0;
`

Li.defaultProps = {
  family: 'sans',
  color: 'bodyMain',
}

export const Input = styled.input`
  border: 1px solid;
  border-color: body.4;
  font-family: serif;
  font-size: 5;
  width: 100%;
  height: 32px;
  padding: 0 3;

  &:focus {
    border-color: body.6;
  }
`