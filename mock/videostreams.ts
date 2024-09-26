import faker from 'faker'
import { Response, Request } from 'express'
import { IVideoStreamData } from '../src/api/types'

const vsList: IVideoStreamData[] = []
const vsCount = 10
const mockFullContent = '<p>I am testing data</p>'

for (let i = 0; i < vsCount; i++) {
  vsList.push({
    id: i,
    user: faker.random.arrayElement(['test', 'admin', 'visen']),
    type: faker.random.arrayElement(['local stream', 'remote stream', 'test stream']),
    title: faker.random.arrayElement(['一号摄像头', '二号摄像头', '三号摄像头', '四号摄像头']),
    info: faker.random.arrayElement(['人员装束识别', '高空作业安全识别', '手扶吊物识别']),
    startTime: faker.date.between('2024-05-01T00:00:00.000Z', '2024-05-02T00:00:00.000Z').getTime(),
    runningTime: faker.random.arrayElement(['1.5h', '1.8h', '5.3h', '8.4h']),
    endTime: faker.date.between('2024-05-02T00:00:00.000Z', '2024-05-03T00:00:00.000Z').getTime(),
    status: faker.random.arrayElement(['running', 'ready', 'terminated', 'retry']),
    Operations: ['remove', 'retry', 'details'],
  })
}

export const getVideoStreams = (req: Request, res: Response) => {
  const { user, type, title, page = 1, limit = 20, sort } = req.query

  let mockList = vsList.filter(item => {
    if (user && item.user !== user) return false
    if (type && item.type !== type) return false
    if (title && item.title.indexOf(title as string) < 0) return false
    return true
  })

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getVideoStream = (req: Request, res: Response) => {
  const { id } = req.params
  for (const vs of vsList) {
    if (vs.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          vs
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'vs not found'
  })
}

export const getvsPageviews = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      pageviews: [
        { key: 'PC', pageviews: 1024 },
        { key: 'Mobile', pageviews: 1024 },
        { key: 'iOS', pageviews: 1024 },
        { key: 'Android', pageviews: 1024 }
      ]
    }
  })
}


// todo: 编辑
export const createVideoStream = (req: Request, res: Response) => {
  const { vs } = req.body
  return res.json({
    code: 20000,
    data: {
      vs
    }
  })
}

export const updateVideoStream = (req: Request, res: Response) => {
  const { id } = req.params
  const { vs } = req.body
  for (const v of vsList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          vs
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const deleteVideoStream = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}


