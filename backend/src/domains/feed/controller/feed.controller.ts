import FeedService from '../service/feed.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import { Beach } from '../../beach/entity/beach.entity';
import { UpdateFeedDto } from '../dto/update-feed.dto';

export default class FeedController {
  constructor(private feedService: FeedService) {}

  /**
   * 해수욕장 피드 전체 조회
   */
  public getAllFeed: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    const { beachId } = req.params;
    try {
      const data = await this.feedService.getAllFeed(query, Number(beachId));
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      console.log('해수욕장 피드 전체 조회 Error: ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 특정 피드 조회
   */
  public findOneByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;

    try {
      const feed = await this.feedService.findOneByFeed(Number(feedId));
      res.status(STATUS_CODE.SUCCESS.OK).json({ data: feed });
    } catch (error) {
      console.log('특정 피드 조회 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 피드 생성
   */
  public createFeed: RequestHandler = async (req: Request, res: Response) => {
    const files = req.files as Express.MulterS3.File[];
    const { content } = req.body;
    const { beachId } = req.params;
    const userId = req.users?.userId;

    const image = files.map((file) => file.location);

    try {
      const feed = await this.feedService.createFeed(Number(userId), Number(beachId), content, image);
      res.status(STATUS_CODE.SUCCESS.CREATED).json({ file: feed });
    } catch (error) {
      console.log('피드 생성 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 해수욕장 피드 수정
   */
  public updateFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;
    const updateFeedDto: UpdateFeedDto = req.body;

    try {
      const feed = await this.feedService.updateFeed(Number(feedId), updateFeedDto);
      res.status(STATUS_CODE.SUCCESS.OK).json({ data: feed });
    } catch (error) {
      console.log('해수욕장 피드 수정 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 해수욕장 피드 삭제
   */
  public deleteFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;

    try {
      const feed = await this.feedService.deleteFeed(Number(feedId));
      res.status(STATUS_CODE.SUCCESS.OK).json(feed);
    } catch (error) {
      console.log('해수욕장 피드 삭제 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
