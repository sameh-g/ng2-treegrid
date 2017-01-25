import { Ng2treegridPage } from './app.po';

describe('ng2treegrid App', function() {
  let page: Ng2treegridPage;

  beforeEach(() => {
    page = new Ng2treegridPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
