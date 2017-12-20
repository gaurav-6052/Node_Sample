/**
 * Definitions of API events.
 */
var apiEvents = {};
module.exports = apiEvents;


// -------------------- CONNECTING ----------------------
apiEvents.connect_request = {
    name: 'CONNECT_REQUEST',
    desc: 'A User has requested to connect to you.',
    actionable: true,
    category: 'connect'
};

apiEvents.connected = {
    name: 'CONNECTED',
    desc: 'You are now connected to a user.',
    category: 'connect'
};

// ------------------BALL REQUEST PLANNING----------------
apiEvents.ball_invite_request = {
    name: 'BALL_INVITE_REQUEST',
    desc: 'A user has invited you to his ball-request.',
    actionable: true,
    category: 'ball'
};

apiEvents.ball_join_request = {
    name: 'BALL_JOIN_REQUEST',
    desc: 'A user has requested to join  your ball-request.',
    actionable: true,
    category: 'ball'
};

apiEvents.ball_invite_accept = {
    name: 'BALL_INVITE_ACCEPT',
    desc: 'A user has accepted the invitaion to your ball-request.',
    category: 'ball'
};

apiEvents.ball_join_accept = {
    name: 'BALL_JOIN_ACCEPT',
    desc: 'A user has accepted your request to join his ball-request.',
    category: 'ball'
};

apiEvents.ball_cancelled = {
    name: 'BALL_CANCELLED',
    desc: 'A ball game has been cancelled by its creator.',
    category: 'ball'
};

apiEvents.ball_created = {
    name: 'BALL_CREATED',
    desc: 'A ball game has been created by a user.'
};


//------------------------- GAME -------------------------------
apiEvents.game_started = {
    name: 'GAME_STARTED',
    desc: 'A player has started the ball game. You should join in too.',
    actionable: true,
    category: 'game'
};

apiEvents.player_playing = {
    name: 'PLAYER_PLAYING',
    desc: 'A player has joined the ball game and is playing.'
};

apiEvents.score_updated = {
    name: 'SCORE_UPDATED',
    desc: 'Hole score updated for a player in a ball game.'
};

apiEvents.player_done = {
    name: 'PLAYER_DONE',
    desc: 'A player has done playing the ball game.'
};

apiEvents.game_ended = {
    name: 'GAME_ENDED',
    desc: 'A ball game has finished. Final scores are out now.',
    category: 'game'
};

// -------------------- CONNECTION ACTIVITY-------------------
apiEvents.played_game = {
    name: 'PLAYED_GAME',
    desc: 'A connection has played a ball game.',
    category: 'game'
}

apiEvents.favourite_details = {
    name: 'FAVOURITE_DETAILS',
    desc: 'An Event is Become Favourite.'
}

apiEvents.reviewed_course = {
    name: 'REVIEWED_COURSE',
    desc: 'A connection has rated and reviewed a Golf Course.'
}

apiEvents.liked_news = {
    name: 'LIKED_NEWS',
    desc: 'A connection has liked a news.',
    category: 'news'
};

apiEvents.commented_news = {
    name: 'COMMENTED_NEWS',
    desc: 'A connection has commented on a news.',
    category: 'news'
};

apiEvents.liked_feed = {
    name: 'LIKED_FEED',
    desc: 'A connection has liked a feed.',
    category: 'feed'
};

apiEvents.commented_feed = {
    name: 'COMMENTED_FEED',
    desc: 'A connection has commented on a feed.',
    category: 'feed'
};

//------------------------- TOURNAMENT -------------------------------
apiEvents.tournament_invite_request = {
    name: 'TOURNAMENT_INVITE_REQUEST',
    desc: 'A tournament is published. You should join this tournament',
    actionable: true,
    category: 'tournament'
};

apiEvents.tournament_started = {
    name: 'TOURNAMENT_STARTED',
    desc: 'A tournament is started. You should join in too ',
    actionable: true,
    category: 'tournament'
};

apiEvents.tournament_game_score_updated = {
    name: 'TOURNAMENT_GAME_SCORE_UPDATED',
    desc: 'Hole score updated for a player in a ball game.'
};

apiEvents.tournament_concluded = {
    name: 'TOURNAMENT_CONCLUDED',
    desc: 'Tournament is concluded. You can view the scorecard',
    category: 'tournament'
};

apiEvents.tournament_joined = {
    name: 'TOURNAMENT_JOINED',
    desc: 'User successfully joined the tournament',
    category: 'tournament'
};

// ------------------------- OTHER -----------------------------
// apiEvents.new_news = {
//     name: 'NEW_NEWS',
//     desc: 'A new news item has been published by admin.',
//     category: 'news'
// };

// apiEvents.new_course = {
//     name: 'NEW_COURSE',
//     desc: 'A new golf course has been published by admin.'
// };
