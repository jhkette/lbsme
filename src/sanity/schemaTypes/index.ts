import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'

import { faqs } from './faqs'
import { textPage } from './textPage'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blockContentType, faqs, textPage],
}
