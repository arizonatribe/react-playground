import faker from "faker"

/**
 * Genereates a random number between a floor and ceiling value
 *
 * @function
 * @name randomNumber
 * @param {number} [min=1] The minimum value to be generated
 * @param {number} [max=5] The maximum value to be generated
 * @returns {number} The generated value
 */
function randomNumber(min = 1, max = 5) {
  return Math.floor(Math.random() * max) + min
}

/**
 * Applies a data generator function a specified number of times
 *
 * @function
 * @name generateNumberOfItems
 * @param {function} generator A function which will be used to generate data the specified number of times
 * @param {number} [numOfItems=10] The number of times to generate the data
 * @returns {Array<*>} A list of data (objects). The list size corresponds to the provied `numOfItems`.
 */
function generateNumberOfItems(generator, numOfItems = 10) {
  return Array(numOfItems).fill("").map(generator)
}

/**
 * An address
 *
 * @typedef {Object<string, string>} Address
 * @property {string} id
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} county
 * @property {string} timeZone
 * @property {string} country
 */

/**
 * Generates an address
 *
 * @function
 * @name createAddress
 * @returns {Address} A randomly generated address
 */
function createAddress() {
  return {
    id: faker.datatype.uuid(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    postalCode: faker.address.zipCode(),
    county: faker.address.county(),
    timeZone: faker.address.timeZone(),
    country: "US"
  }
}

/**
 * A single author
 *
 * @typedef {Object<string, string|Address|Array<BlogPost>>} Author
 * @property {string} id
 * @property {string} profile
 * @property {string} email
 * @property {string} phone
 * @property {string} title
 * @property {Address} address
 * @property {string} name
 * @property {Array<BlogPost>} posts
 */

/**
 * Generates an author
 *
 * @function
 * @name createAuthor
 * @returns {Author} A randomly generated author
 */
function createAuthor() {
  return {
    id: faker.datatype.uuid(),
    profile: faker.internet.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    title: faker.name.jobTitle(),
    address: createAddress(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`
  }
}

/**
 * A company
 *
 * @typedef {Object<string, string|Address|Array<Author>>} Company
 * @property {string} id
 * @property {string} email
 * @property {string} phone
 * @property {Address} address
 * @property {string} name
 * @property {string} description
 * @property {Array<Author>} authors
 */

/**
 * Generates a company
 *
 * @function
 * @name createCompany
 * @returns {Company} A randomly generated company
 */
function createCompany() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: createAddress(),
    name: faker.company.companyName(),
    description: faker.company.bs()
  }
}

/**
 * A single blog post
 *
 * @typedef {Object<string, string|Author>} BlogPost
 * @property {string} id
 * @property {string} date
 * @property {string} title
 * @property {string} content
 * @property {Author} author
 */

/**
 * Generates a blog post
 *
 * @function
 * @name createPost
 * @returns {BlogPost} A randomly generated blog post
 */
function createPost() {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    title: faker.lorem.sentence(),
    content: generateNumberOfItems(faker.lorem.paragraph, randomNumber(2, 4)).join("\n\n")
  }
}

/**
 * Simulates an async call by delaying the return of data by a given amount
 *
 * @function
 * @name simulateFetchWaitTime
 * @param {Object<string, any>|Array<Object<string, any>>} data Data to be delayed
 * @param {number} [wait=0] The amount of time (in seconds) to delay the return of the data
 * @returns {Promise<Object<string, any>|Array<Object<string, any>>>} A promise which resolves with the provided data when the delay has beeen reached
 */
async function simulateFetchWaitTime(data, wait = 0) {
  return Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, wait * 1000)
  })
}



/**
 * Similates a fetching of data.
 *
 * @function
 * @name fetchData
 * @param {number} [delay=0] The number of seconds to delay the resolution of the promises
 * @returns {ApiClient} The async API client
 */
export function fetchData(delay = 0) {
  /**
   * An async API client whose methods return data of a certain type
   *
   * @class
   * @name ApiClient
   */
  return {
    /**
     * Retrieves one or more authors
     *
     * @function
     * @name ApiClient#authors
     * @param {number} [pageSize=10] The number of authors to retrieve
     * @returns {Promise<Array<Author>>} A promise which resolves with one or more Authors
     */
    async authors(pageSize = 10) {
      const data = generateNumberOfItems(createAuthor, pageSize)

      for (let i = 0; i < data.length; i++) {
        data.posts = generateNumberOfItems(createPost, randomNumber(1, 10))
      }

      return simulateFetchWaitTime(data, delay)
    },

    /**
     * Retrieves one or more posts
     *
     * @function
     * @name ApiClient#posts
     * @param {number} [pageSize=10] The number of posts to retrieve
     * @returns {Promise<Array<BlogPost>>} A promise which resolves with one or more BlogPosts
     */
    async posts(pageSize = 10) {
      const data = generateNumberOfItems(createPost, pageSize)

      for (let i = 0; i < data.length; i++) {
        data.author = createAuthor()
      }

      return simulateFetchWaitTime(data, delay)
    },

    /**
     * Retrieves one or more companies
     *
     * @function
     * @name ApiClient#companies
     * @param {number} [pageSize=10] The number of companies to retrieve
     * @returns {Promise<Array<Company>>} A promise which resolves with one or more Company records
     */
    async commpanies(pageSize = 10) {
      const data = generateNumberOfItems(createCompany, pageSize)

      for (let i = 0; i < data.length; i++) {
        data.authors = generateNumberOfItems(createAuthor, randomNumber(1, 5))
        for (let j = 0; j < data.authors.length; j++) {
          data.authors = generateNumberOfItems(createAuthor, randomNumber(1, 5))
          data.authors[j].posts = generateNumberOfItems(createPost, randomNumber(1, 10))
        }
      }

      return simulateFetchWaitTime(data, delay)
    }
  }
}
