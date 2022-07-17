insert into user (nickname, name, image) values
('guest', 'guestMode', 'http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg'),
('leejohy', 'lucid', 'https://avatars.githubusercontent.com/u/62360009?v=4'),
('elon', 'tesla', 'https://avatars.githubusercontent.com/u/47338871?v=4'),
('han', 'khan', 'https://avatars.githubusercontent.com/u/93566353?v=4'),
('mina', 'jamie', 'https://avatars.githubusercontent.com/u/62706988?v=4'),
('jung', 'honux', 'https://avatars.githubusercontent.com/u/2168702?v=4'),
('jisu', 'crong', 'https://avatars.githubusercontent.com/u/1456761?v=4'),
('kim', 'jk', 'https://avatars.githubusercontent.com/u/278988?v=4'),
('Bae', 'ivy', 'https://avatars.githubusercontent.com/u/20774764?v=4');

insert into milestone (name, description, due_date, is_opened) values
('BE_Course', '백엔드입니다.', null, true),
('Fe_Course', '프론트입니다.', null, false),
('Android_Course', '안드로이드입니다.', null, true),
('iOS_Course', 'iOS 입니다.', null, true);

insert into label (name, description, label_color, text_color) values
('BE', '배겐드', 'blue', 'white'),
('FE', '프론트엔드', 'Red', 'black'),
('루시드', '배겐드멤버', 'red', 'white'),
('제이미', '프론트멤버', 'yellow', 'white'),
('칸', '프론트멤버', 'gold', 'white');

insert into issue (title, content, is_opened, written_time, modification_time, user_id, milestone_id) values
('title1', 'content1', true, null, null, 1, 1),
('title2', 'content2', true, null, null, 2, 2),
('title3', 'content3', true, null, null, 2, 3),
('title4', 'content4', false, null, null, 3, 4),
('title5', 'content5', true, null, null, 1, 2),
('title6', 'content6', true, null, null, 5, 3),
('title7', 'content7', true, null, null, 7, 2);

insert into attached_label (issue_id, label_id) values
(1, 3),
(1, 4),
(2, 2),
(2, 3);

insert into comment (content, written_time, user_id, issue_id, editable) values
('comment content1', null, 1, 2, true),
('comment content2', null, 2, 3, true),
('comment content3', null, 1, 2, true),
('comment content4', null, 1, 3, true),
('comment content5', null, 3, 1, true),
('comment content6', null, 3, 3, true),
('comment content7', null, 2, 5, true);

insert into assigned_issue (user_id, issue_id) values
(1, 3),
(1, 4),
(2, 5),
(2, 1),
(2, 2),
(6, 3),
(7, 2),
(8, 7),
(9, 5);


