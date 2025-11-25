import { News } from '@/models/news.model'
import { Service } from '.'

class NoticiasService extends Service {
  async getNoticias() {
    
    return this.requester
      .request<News[]>({
        url: '',
        method: 'GET',
      })
      .then((res) => res.data.map((item) => this.formatNews(item)))
      
  }

  async getNoticiaById(id: string) {
    return this.requester
      .request<News>({
        url: `/${id}`,
        method: 'GET',
      })
      .then((res) => this.formatNews(res.data))
      
  }

  private formatNews(item: News) {
    let formattedDate: string | undefined

    if (item.date instanceof Date) {
      formattedDate = item.date.toISOString().split('T')[0]
    } else if (typeof item.date === 'string') {
      const d = new Date(item.date)
      formattedDate = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : undefined
    }

    return {
      ...item,
      id: item.id?.toString?.() ?? '',
      date: formattedDate,
      image: item.imageUrl ? { uri: item.imageUrl } : undefined,
      extraSections: Array.isArray(item.extraSections)
        ? item.extraSections.map((section) => ({
            ...section,
            image: section.imageUrl ? { uri: section.imageUrl } : undefined,
          }))
        : [],
    }
  }
}

export default new NoticiasService('/news')
