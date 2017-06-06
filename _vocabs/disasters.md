---
title: Disasters
display-title: Disasters (Beta)
status: Available via ReliefWeb API
managed-by: ReliefWeb
---

The Disasters list provides access to disaster names and disaster types covered by ReliefWeb, humanitarianresponse.info, and Humanitarian ID since 1981. It also includes the relevant GLIDE number.

Requests should be made to the ReliefWeb API disasters endpoint with an additional parameter 'preset=external', for example:  <https://api.reliefweb.int/v1/disasters?appname=vocabulary&preset=external&limit=1000>

See the API documentation for full details: <http://apidoc.rwlabs.org/>
