---
title: Location Maps (ReliefWeb)
status: Available via ReliefWeb API
managed-by: ReliefWeb
contact-email: feedback@reliefweb.int
---

Contains small locations maps of all the countries that ReliefWeb covers. Included are both preview (thumbnail) and full size versions of PNG and PDF formats.

[Site listing all location maps, including formats, and licensing details](http://reliefweb.int/location-maps)

Requests should be made to the ReliefWeb API reports endpoint through https with an additional parameter of your application name (appname), for example:
[example API request](https://api.reliefweb.int/v1/reports?fields[include][]=file&query[value]=feature:%22Location%20Map%22&appname=vocabulary)

See the API documentation for full details: <http://apidoc.rwlabs.org/>
