import BookmarkService from '../service/bookmark.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

export default class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  /**
   * 피드 북마크 / 취소
   */
  public bookmarkByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;
    const userId = req.users?.userId;

    try {
      const bookmark = await this.bookmarkService.findOneByBookmark(Number(userId), Number(feedId));

      if (!bookmark) {
        await this.bookmarkService.createBookmarkByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.bookmarkService.cancelBookmarkByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ data: false });
      }
    } catch (error) {
      console.log('피드 좋아요 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 해수욕장 북마크 / 취소
   */
  public bookmarkByBeach: RequestHandler = async (req: Request, res: Response) => {
    const { beachId } = req.params;
    const userId = req.users?.userId;

    try {
      const bookmark = await this.bookmarkService.findOneBookmarkByBeach(Number(userId), Number(beachId));

      if (!bookmark) {
        await this.bookmarkService.createBookmarkByBeach(Number(userId), Number(beachId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.bookmarkService.cancelBookmarkByBeach(Number(userId), Number(beachId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ data: false });
      }
    } catch (error) {
      console.log('해수욕장 북마크 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
