import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { dealOffer} from './dealOffer'
import { faqs } from './faqs'
import { textPage } from './textPage'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blockContentType, dealOffer, faqs, textPage],
}
