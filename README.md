# valex-api
* URL: https://valex-projeto-18.herokuapp.com
##  :arrow_upper_right: Rotas
---
### POST: /newcard
#### Exemplo<br/>
* Body<br/>
{
       "employeeId": 2, 
       "typeCard": "education"
}<br/>
* Headers<br/>
apikey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0<br/><br/>
---

###   POST: /activatecard
#### Exemplo<br/>
* Body<br/>
{
    "cardId":"1", 
	  "securityCode":"398", 
	  "password":"2222"
}<br/><br/>
---
### PUT: /blockcard
#### Exemplo<br/>
* Body<br/>
{
    	"cardId":1, 
	    "password": 2222
}<br/><br/>
---
### PUT: /unlockcard
#### Exemplo<br/>
* Body<br/>
{
    	"cardId":1, 
	    "password": 2222
}<br/><br/>
---
### POST: /newrecharge
#### Exemplo<br/>
* Body<br/>
{
    	"cardId":1, 
	    "amount": 230
}<br/>
* Headers<br/>
apikey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0<br/><br/>
---
### POST: /newbuy
#### Exemplo<br/>
* Body<br/>
{
    "cardId":1, 
	  "password": 2222, 
	  "businessId": 1, 
	  "amount": 30 
}<br/><br/>
---
### GET: /list-transactions
#### Exemplo<br/>
* Body<br/>
{
    	"cardId":1
}<br/><br/>
