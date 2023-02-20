
async function queryHasuraGQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFuYTEiLCJpYXQiOjE2NzY5MTUxMjEsImV4cCI6MTY3NzUyMDAxMCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6Im5vdEFuYSJ9fQ.crqKsr-sqO2aftr6Nfr1GodDbnVPnt3TEayZZ43OP6c"
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}
function fetchMyQuery() {
    const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
        publicAddress
      }
    }
  `;
    return queryHasuraGQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }
    // do something great with this precious data
    console.log(data);
}
startFetchMyQuery();