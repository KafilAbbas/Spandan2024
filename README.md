The sign up code is not yet completed.

Flow and endpoint for signup:

url : api/user/create/sendOTP  with POST method
data expected in request body : valid email. (structure of email to be verified in the frontend)

checks if the email is already registered or not.
if not registered:
  generates an otp and stores the (email, otp) in cache.
  Sends the otp to that email for verification.



url : api/user/otp/verify  with POST method
data expected in request body : all fields required for creaeting a new user, password and OTP to verify

First checks if the data recieved is good or enough to create a new user.
Compared the recieved otp against the cached OTP using the email field to get the OTP from cache.
If OTP is matched then creates a new user, assigns the password to the user and save to the database.
Creates the access_token and refresh_token and adds them in the response body.
