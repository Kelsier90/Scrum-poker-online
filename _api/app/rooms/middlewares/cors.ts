import Cors from 'cors'

export default function (httpMethod: string) {
  return Cors({
    methods: [httpMethod.toUpperCase(), 'HEAD'],
    origin: process.env.CORS_ORIGINS.split(',')
  })
}
