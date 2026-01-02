import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'util'
import { TransformStream, ReadableStream, WritableStream } from 'web-streams-polyfill/polyfill'

Object.assign(global, { TextEncoder, TextDecoder, TransformStream, ReadableStream, WritableStream })