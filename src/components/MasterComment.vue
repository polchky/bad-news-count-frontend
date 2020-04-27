<template>
    <vListItem
        three-line
    >
        <vListItemAvatar>
            <vImg :src="comment.imageUrl" />
        </vListItemAvatar>
        <vListItemContent>
            <vListItemSubtitle class="mb-2">
                <strong class=".font-weight-bold white--text">
                    {{ comment.author }}
                </strong>
                , il y a {{ utils.getTimeDiff(new Date(comment.published)) }}
            </vListItemSubtitle>
            <vListItemTitle>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="comment.text" />
            </vListItemTitle>
            <template v-if="comment.repliesCount > 0">
                <vListItemSubtitle @click="comment.expanded = !comment.expanded">
                    <vBtn
                        text
                        class="blue--text text-capitalize"
                    >
                        <vIcon>
                            {{ comment.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </vIcon>
                        {{ comment.expanded ? 'cacher' : 'montrer' }} {{ comment.repliesCount > 1 ? `les ${comment.repliesCount} réponses` : 'la réponse' }}
                    </vBtn>
                </vListItemSubtitle>
                <Replies
                    v-show="comment.expanded"
                    :replies="replies"
                />
            </template>
            <vListItemSubtitle
                v-if="comment.expanded"
                @click="getNextReplies()"
            >
                <vBtn
                    text
                    class="blue--text text-capitalize"
                    :disabled="loadNextRepliesButtonDisabled"
                    :loading="loadNextRepliesButtonDisabled"
                >
                    <vIcon>
                        mdi-subdirectory-arrow-right
                    </vIcon>
                    afficher plus de réponses
                </vBtn>
            </vListItemSubtitle>
        </vListItemContent>
    </vListItem>
</template>

<script>
import utils from '@/assets/js/utils';
import service from '@/assets/js/service';

import Replies from '@/components/Replies';

export default {

    components: {
        Replies,
    },

    props: {
        comment: { type: Object, default: () => {} },
    },

    data: () => ({
        utils,
        offset: 0,
        replies: [],
        loadNextRepliesButtonDisabled: false,
    }),

    async created() {
        await this.getNextReplies();
    },

    methods: {
        async getNextReplies() {
            this.loadNextRepliesButtonDisabled = true;
            const limit = 20;
            let nextReplies = await service.getMasterReplies(limit, this.offset);
            this.offset += limit;
            nextReplies = nextReplies.map((c) => {
                c.expanded = false;
                c.text = utils.searchZizis(c.text);
                return c;
            });
            this.replies.push(...nextReplies);
            this.loadNextRepliesButtonDisabled = false;
        },
    },
};
</script>
