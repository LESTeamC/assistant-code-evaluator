import { AngularCodeEvaluatorCliPage } from './app.po';

describe('angular-code-evaluator-cli App', function() {
  let page: AngularCodeEvaluatorCliPage;

  beforeEach(() => {
    page = new AngularCodeEvaluatorCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
