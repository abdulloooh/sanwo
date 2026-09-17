# Manual Test Notes: Preview Reminder Email Feature

## Test Environment Setup
1. Ensure backend API is running with the `POST /api/debts/preview-reminder` endpoint
2. Configure `.env` file with `REACT_APP_API_URL` pointing to the backend
3. Ensure you're logged in with a user account that has an email address

## Test Cases

### Test 1: Preview Email on New Debt Form
**Steps:**
1. Navigate to `/debts/new`
2. Fill in the form fields:
   - Name: "Test Debtor"
   - Amount: 1000
   - Date Due: (select a future date)
   - Status: "Owed to Me"
   - Party Email: (leave empty)
3. Locate the "Send me a sample reminder email" button below the email field
4. Click the button

**Expected Results:**
- Button text changes to "Sending..." while processing
- Button is disabled during sending
- Success toast appears: "Sample email sent to [your-email]"
- Email is received at the logged-in user's email address
- Button re-enables after completion
- Form values remain unchanged

### Test 2: Preview Email with Party Email Filled
**Steps:**
1. Navigate to `/debts/new`
2. Fill in the form fields:
   - Name: "Friend Name"
   - Amount: 500
   - Date Due: (select a future date)
   - Status: "Owed by Me"
   - Party Email: "friend@example.com"
3. Click "Send me a sample reminder email"

**Expected Results:**
- Preview email sent to your email only (not to party email)
- Response should indicate if counterparty preview was included
- Success toast displays

### Test 3: Preview Email on Edit Debt Form
**Steps:**
1. Navigate to an existing debt (e.g., `/debts/[debt-id]`)
2. Modify some fields if desired
3. Click "Send me a sample reminder email"

**Expected Results:**
- Preview uses current form values (including any unsaved changes)
- Success toast appears
- Original debt record remains unchanged in database

### Test 4: Error Handling - User Has No Email
**Steps:**
1. Login with a user account that has no email address
2. Navigate to debt form
3. Click "Send me a sample reminder email"

**Expected Results:**
- Error toast appears with appropriate message
- Button re-enables after error

### Test 5: Error Handling - Rate Limiting (Production Only)
**Steps:**
1. In production environment, send a preview email
2. Immediately try to send another preview within the same hour

**Expected Results:**
- Error toast appears indicating rate limit
- Button re-enables after error

### Test 6: Button State Management
**Steps:**
1. Navigate to debt form
2. Click "Send me a sample reminder email" button
3. While request is processing, try to click button again

**Expected Results:**
- Button is disabled during request
- Multiple clicks don't trigger multiple requests
- Button shows "Sending..." text

### Test 7: Form Validation Not Triggered
**Steps:**
1. Navigate to `/debts/new`
2. Leave form mostly empty (only fill name and amount)
3. Click "Send me a sample reminder email" (don't click "Add Debt")

**Expected Results:**
- Preview email sends successfully
- Form validation errors do NOT appear
- Form is NOT submitted
- User can still edit and save the debt later

### Test 8: UI/UX Verification
**Steps:**
1. Navigate to debt form
2. Observe the preview email button placement and styling

**Expected Results:**
- Button appears below the party email field's help text
- Button styled as a link (btn-link) for subtlety
- Small, unobtrusive design
- Clear explanatory text below button: "Test how the reminder will look. Goes to your email only."
- Doesn't clutter the form

## Code Review Checklist
- ✅ Service method added to `debtService.js`
- ✅ Service method uses existing `http.post` pattern
- ✅ Correct endpoint: `/api/debts/preview-reminder`
- ✅ Component imports the new service method
- ✅ State management includes `sendingPreview` flag
- ✅ Handler uses `trackPromise` for loading indicator
- ✅ Handler formats data correctly (amount with $ prefix)
- ✅ Handler includes all required fields
- ✅ Toast notifications for success/error
- ✅ Button disabled while sending
- ✅ Error handling for response errors
- ✅ UI placed near email field as specified
- ✅ Simple English copy for Nigerian users
- ✅ Existing party email help text preserved
- ✅ Follows existing React/bootstrap patterns
- ✅ Button type="button" (doesn't trigger form submit)

## Notes
- The feature works on both create and edit forms
- Preview always goes to logged-in user's email only
- partyEmail can be empty - backend handles this
- Backend rate-limiting is 1 preview per hour in production
- Feature uses existing authentication (JWT)
