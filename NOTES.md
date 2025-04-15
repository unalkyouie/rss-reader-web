# RSS Reader - Notes & Plans 

## Plan #1
1. **Getting the setup going**
    - Should I go with `create-react-app` or try `Vite`? I'll decide based on vibes probably. -`create-react-app`
    - Maybe some basic routing ? Let's keep it simple for now. - 

2. **Core functionalities**
    - Grab RSS feeds using `rss-parser` - seems chill
    - Make sure feeds and articles get saved in localStorage (no surprise refreshes).

3. **Extra**
    - Search ? - at least by title, apps without search function get annoying with this amount of possible data
    - Mark as unread - to not forget (I like this one) 
    - "Read later" - I think it's better than favourites tbh, but maybe I'm wrong, I'll see 

4. **Testing**
    -At least start with simple core features, can't let myself refactors breaking my hard work 

5. **Polish**
    - Clean up the UI - maybe custom or find some cool CSS framwork. 
    - Keep it responsive
    - Dark mode would be cool

---

## Thoughts along the way

Let's try different setups and check what works. Something breaks, other thing goes perfectly - that's just how it goes, right ? Learning tons from different ideas. 

I'll probably keep tweaking things along the way. It's all about seeing how small changes affect the app and keeping that flow going. 

Keeping ES2020 cuz not really sure about the browsers support

## Branch: feat/feed-manager 

Goal: 
Foundation for managing RSS feeds: 
- [x] A component to list current feeds
- [ ] Adding new feed - (URL validation?)
- [ ] Editing existing feed 
- [ ] Local persistence via localStorage
- [ ] Tests for each step 

Vibe check: Starting small and smart (trying) - 1. tests 2. code 
Baby steps with standards 

I got too much frustrated rn in fact, maybe it's the end of the week vibe or idk 

Starting to feel good about this. 
-> Got the feeds - time to show some content. 
ArticlesList will take a list of articles (mocked now) - should: display title, feed name and publication date
Articles sorted by date (new first)

Fun fact: feeds mean nothing without articles xD

-> Lets connect these little babies
- [x] Install `rss-parser`
- [x] Wrap the fetching logic into reusable hook 
- [ ] Feed it

** Polishing **

[x] change folder structure to be more feature oriented with some global components
[x] move tests per feature
[x] move mocks globally
[x] global paths in tsconfig
[ ] add utils for parsing RSS 
[ ] add formatting date
[ ] add glovbal reusable components (Button, Input ...)