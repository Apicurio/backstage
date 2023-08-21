# UMB - UNIFIED Message Bus

The Unified Message Bus is a messaging platform that integrates different systems used within Red Hat. It can be used to trigger jobs and actions based on messages published on topics available on the UMB. Almost all of the systems used for development and productization provide integration with UMB: Jira, Errata, Dist Git, PNC, brew, etc. It is also possible to send messages/notifications using the UMB, so that other teams can be notified of team-specific events (ie.: to notify when the dev build of a certain component is complete).

Checkout this [guide](https://docs.engineering.redhat.com/display/JP/Getting+Started+with+UMB+Integration) on how you can integrate your jenkins jobs with UMB.
