import { Service } from '.'

class CategorySexService extends Service {
  async getSexBranches(tournamentId?: string) {
    const response = await this.requester.request({
      method: 'get',
      params: { tournamentId },
    })

    const data = response.data.flat()

    const sexos = Array.from(
      new Set(
        data
          .map((cat: any) => cat.sexBranch?.description?.trim())
          .filter(Boolean)
      )
    )

    return sexos
  }
}

export default new CategorySexService('/category/with-sex')
