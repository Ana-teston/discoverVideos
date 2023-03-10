export async function insertStats(
    token,
    { favourite, userId, watched, videoId }
) {
    const operationsDoc = `
  mutation insertStats($favourite: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
      favourite: $favourite, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
        favourite
        userId
    }
  }
`;

    return await queryHasuraGQL(
        operationsDoc,
        "insertStats",
        { favourite, userId, watched, videoId },
        token
    );
}

export async function updateStats(
    token,
    { favourite, userId, watched, videoId }
) {
    const operationsDoc = `
mutation updateStats($favourite: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
  update_stats(
    _set: {watched: $watched, favourite: $favourite}, 
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favourite,
      userId,
      watched,
      videoId
    }
  }
}
`;

    return await queryHasuraGQL(
        operationsDoc,
        "updateStats",
        { favourite, userId, watched, videoId },
        token
    );
}

export async function findVideoIdByUser(token, userId, videoId) {
    const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favourite
      watched
    }
  }
`;

    const response = await queryHasuraGQL(
        operationsDoc,
        "findVideoIdByUserId",
        {
            videoId,
            userId,
        },
        token
    );

    return response?.data?.stats;
}

export async function createNewUser(token, metadata) {
    const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
    const {issuer, email, publicAddress } = metadata;
    const response = await queryHasuraGQL(
        operationsDoc,
        "createNewUser",
        {
            issuer,
            email,
            publicAddress
        },
        token
    );
    return response?.data?.stats?.length > 0;
}


export async function isNewUser(token, issuer) {
    const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;
    const response = await queryHasuraGQL(
        operationsDoc,
        "isNewUser",
        {
            issuer,
        },
        token
    );
    return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

export async function getWatchedVideos( userId, token) {

    const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId},
      watched: {_eq: true}
      }) {
      videoId
    }
  }
`;
    const response = await queryHasuraGQL(
        operationsDoc,
        "watchedVideos",
        {
            userId,
        },
        token
    );

    return response?.data?.stats;
}

export async function getMyListVideos( userId, token) {

    const operationsDoc = `
  query favouriteVideos($userId: String!) {
    stats(where: {
      userId: {_eq: $userId},
      favourite: {_eq: 1}
      }) {
      videoId,
    }
  }
`;
    const response = await queryHasuraGQL(
        operationsDoc,
        "favouriteVideos",
        {
            userId,
        },
        token
    );

    return response?.data?.stats;
}