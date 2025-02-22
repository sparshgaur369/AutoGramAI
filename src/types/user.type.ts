import { JsonValue } from "@prisma/client/runtime/library"

export type automationDataProps =
    | ({
          keywords: {
              id: string
              word: string
              automationId: string | null
          }[]
      } & {
          id: string
          name: string
          createdAt: Date
          active: boolean
          automation: JsonValue | null
          userId: string | null
      })[]
    | undefined
