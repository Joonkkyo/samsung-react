import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(
  immer(
    combine(
      {
        user: {
          name: 'Neo',
          age: 22,
          address: {
            city: 'Seoul',
            emails: ['jkseo50@gmail.com']
          }
        }
      },
      (set, get) => {
        return {
          changeFirstEmail: (newEmail: string) => {
            set(state => {
              state.user.address.emails[0] = newEmail
            })
            // const { user } = get()
            // set({
            //   user: {
            //     ...user,
            //     address: {
            //       ...user.address,
            //       emails: [newEmail, user.address.emails[1]]
            //     }
            //   }
            // })
          }
        }
      }
    )
  )
)
