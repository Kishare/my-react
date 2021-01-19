import React from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

import {
  Container,
  Form,
  Button,
  Card,
  Row,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userInput: '',
      dateInput: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { userInput } = this.state;
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&q=${userInput}`)
      .then((res) => {
        const events = res.data.records.map(({ fields }) => ({
          title: fields.title,
          description: fields.lead_text,
          image: fields.cover_url,
          id: fields.id,
          category: fields.category,
          address: fields.address_street,
          city: fields.address_city,
          zipcode: fields.address_zipcode,
          date_start: fields.date_start,
          date_end: fields.date_end,
        }));
        this.setState({ events });
      });
  }

  searchDate(date) {
    this.setState({ dateInput: date.format('YYYY-MM-DD') });
    const { dateInput, userInput } = this.state;
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&q=${userInput}${dateInput ? `&facet=date_start&refine.date_start=${dateInput}` : ''}`)
      .then((res) => {
        const events = res.data.records.map(({ fields }) => ({
          title: fields.title,
          description: fields.lead_text,
          image: fields.cover_url,
          id: fields.id,
          category: fields.category,
          address: fields.address_street,
          city: fields.address_city,
          zipcode: fields.address_zipcode,
          date_start: fields.date_start,
          date_end: fields.date_end,
        }));
        this.setState({ events });
      });
  }

  render() {
    const { events } = this.state;
    return (
      <Container>
        <Form>
          <Form.Control type="text" placeholder="Rechercher un évènement par le nom" onChange={(e) => this.setState({ events, userInput: e.target.value })} />
          <Button variant="dark" type="button" onClick={this.componentDidMount}>
            Rechercher
          </Button>
        </Form>
        <Datetime
          timeFormat={false}
          locale="fr"
          onChange={(date) => this.searchDate(date)}
        />
        <Row>
          {events.map((event) => (
            <Card style={{ width: '18rem', margin: '1vw' }} key={event.id}>
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle>{`Du ${moment(event.date_start).format('DD/MM/YYYY')} au ${moment(event.date_end).format('DD/MM/YYYY')}`}</Card.Subtitle>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    { `${event.city} ${event.zipcode}` }
                  </ListGroupItem>
                  <ListGroupItem>{event.address}</ListGroupItem>
                </ListGroup>
                <Card.Footer>{event.category}</Card.Footer>
                <Button variant="outline-dark">Voir plus</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}
