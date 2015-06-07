node-rest-tsp
==========

Playing with nodejs, TDD and REST API's to expose <a href="https://github.com/JoaoHenriquePereira/rust-tsp">rust-tsp</a>

# Dependencies

* <a href="http://chaijs.com/">chai</a>
* <a href="http://mochajs.org/">mocha</a>
* <a href="http://mcavage.me/node-restify/">restify</a>
* <a href="http://underscorejs.org/">underscore</a>

# Comments

I started by the very basics by having a sort of a "Hello World" in the server root "/". Then I coded the api entry point at /<project name>/ which on itself describes the app and provides "hypermedia"'ish directioning with JSON. (hypermedia'ish as JSON is not an official format).

I focused on architecturing it properly and using a test driven development to achieve routing requests.

# References

* <a href="http://blog.stateless.co/post/13296666138/json-linking-with-hal">JSON linking with HAL</a>
* <a href="https://scotch.io/">scotch.io</a>
* <a href="https://github.com/jedwood/express-for-APIs/blob/master/server.js">express API</a>
* <a href="http://www.infoq.com/articles/webber-rest-workflow">How to GET a Cup of Coffee</a>
* <a href="http://martinfowler.com/articles/richardsonMaturityModel.html">Richardson maturity model explained</a>

# TODO

* Actually call rust-tsp, atm is just mocked
* Add caching