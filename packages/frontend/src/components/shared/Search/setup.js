import lunr from "lunr";

class SearchSetup {
  createFromData = data => {
    this.idx = lunr(function() {
      this.field("title");
      data.forEach(doc => {
        this.add(doc);
      }, this);
    });
    return this.idx;
  };

  performSearch = query => {
    try {
      return this.idx.search(query).map(result => {
        return result.ref;
      });
    } catch (e) {
      if (e instanceof lunr.QueryParseError) {
        // console.error( 'error', e)
        return;
      } else {
        throw e;
      }
    }
  };
}

export default new SearchSetup();
