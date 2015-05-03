### messagecache

CORS friendly HTTP API for storing and retrieving messages.

API Endpoint: **api/mesagecache**

The following commands are mutually exclusive.

Store a new message in the memory cache:

* **key**
    * {String} Some key.
    * Example: '4q2'
* **value**
    * {String} Something to store. JSON will be unmarshalled into memory.
    * Example:  '{"something": "inJSON maybe or just a string"}'

Get a unique id that has not been used in the cache:

* **getid=1**

Access messages:

* **history=1**

Clear the cache:

* **reset=1**
