# AnyBadge
![](https://anybadge.herokuapp.com/badge?label=create&message=your%20own%20badge)

User content badge provider

## Usage
`https://anybadge.herokuapp.com/badge?<params>`

### Params
name | value | required
--- | --- | ---
message | text | yes
label | text
labelColor | valid css color
color | valid css color
style | `plastic`, `flat`, `flat-square`, `for-the-badge`, `social`

### Examples
params | badge
--- | ---
`message=test` | ![](https://anybadge.herokuapp.com/badge?message=test)
`message=test&color=cc0` | ![](https://anybadge.herokuapp.com/badge?message=test&color=cc0)
`message=test&color=red` | ![](https://anybadge.herokuapp.com/badge?message=test&color=red)
`message=test&label=cool` | ![](https://anybadge.herokuapp.com/badge?message=test&label=cool)
`message=test&label=cool&labelColor=c0c` | ![](https://anybadge.herokuapp.com/badge?message=test&label=cool&labelColor=c0c)
`message=test&label=lol&style=flat` | ![](https://anybadge.herokuapp.com/badge?message=test&label=lol&style=social)
`labelColor=c00&color=0c0&label=test%20wiadomości%20push&message=eśąźć` | ![](https://anybadge.herokuapp.com/badge?labelColor=c00&color=0c0&label=test%20wiadomości%20push&message=eśąźć)
