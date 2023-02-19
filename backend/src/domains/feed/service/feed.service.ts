import FeedRepository from '../repository/feed.repository';
import { Beach } from '../../beach/entity/beach.entity';
import { Feed } from '../entity/feed.entity';
import { BEACH_EXCEPTION } from '../../../exception/error-code';
import BeachRepository from '../../beach/repository/beach.repository';

export default class FeedService {
  private feedRepository: FeedRepository;
  private beachRepository: BeachRepository;
  constructor() {
    this.feedRepository = new FeedRepository();
    this.beachRepository = new BeachRepository();
  }

  /**
   * 해수욕장 피드 작성
   */
  public async createFeed(beachId: number, content: string, image?: string): Promise<Feed> {
    const beach = await this.beachRepository.findOneByBeach(beachId);

    return await this.feedRepository.createFeedByBeachId(beach.beachId, content, image);
  }
}
