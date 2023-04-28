<template>
	<div
		class="modal-wrapper modal d-block"
		tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">삭제확인창</h5>
					<button
						type="button"
						class="btn-close"
						@click="onClose"></button>
				</div>
				<div class="modal-body">
					<p>선택하신 일정을 삭제합니다.</p>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						@click="onClose">
						취소
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="onDelete">
						삭제확인
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		setup(props, { emit }) {
			const onClose = () => {
				emit("close");
			};
			const onDelete = () => {
				emit("delete");
			};
			return { onClose, onDelete };
		},
	};
</script>
<style scoped>
	.modal-wrapper {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
